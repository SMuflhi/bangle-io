import React, { useState, useEffect, useContext } from 'react';
import { TextButton } from 'ui-components';
import { UIManagerContext } from 'ui-context';
import { isValidNoteWsPath, resolvePath, toFSPath } from 'ws-path';
import { ActionContext } from 'action-context';
import {
  deleteFile,
  listAllFiles,
  getWorkspaceInfo,
  getFileSystemFromWsInfo,
  HELP_FS_WORKSPACE_NAME,
  HELP_FS_WORKSPACE_TYPE,
} from 'workspaces/index';

export function HelpWorkspaceMonitor({ wsPath }) {
  const { dispatch } = useContext(UIManagerContext);
  const { isModified, isHelpWorkspace } = useIsHelpWorkspaceModified(wsPath);
  const wsName = wsPath && resolvePath(wsPath).wsName;
  const { dispatchAction } = useContext(ActionContext);
  const uid = 'ws-modified-' + wsName;

  useEffect(() => {
    return () => {
      if (isHelpWorkspace) {
        dispatch({
          type: 'UI/DISMISS_NOTIFICATION',
          value: {
            uid,
          },
        });
      }
    };
  }, [wsName, uid, dispatch, isHelpWorkspace]);

  useEffect(() => {
    if (!isHelpWorkspace || !isModified) {
      return;
    }

    const reset = async (otherWsName) => {
      const files = await listAllFiles(otherWsName);
      await Promise.all(files.map((w) => deleteFile(w)));
    };
    dispatch({
      type: 'UI/SHOW_NOTIFICATION',
      value: {
        severity: 'warning',
        uid,
        content: (
          <span>
            Looks like you have modified a <b>Help file</b>!
            <br />
            Changes made here are temporary and we recommend that you create a
            new workspace if you care about these changes.
          </span>
        ),
        buttons: [
          <TextButton
            hintPos="left"
            className="ml-3"
            onClick={async () => {
              await reset(HELP_FS_WORKSPACE_NAME);
              window.location.pathname = '';
            }}
            hint={`Delete current modifications\nand reset the help pages to their original content`}
          >
            Reset
          </TextButton>,
          <TextButton
            hintPos="left"
            className="ml-3"
            onClick={() => {
              dispatchAction({
                name: '@action/core-actions/CLONE_WORKSPACE_ACTION',
                value: {
                  resetWsName: HELP_FS_WORKSPACE_NAME,
                },
              });
              dispatch({
                type: 'UI/DISMISS_NOTIFICATION',
                value: {
                  uid,
                },
              });
            }}
            hint={`Save the modifications to a new workspace\nand reset the help pages to their original content`}
          >
            Fork
          </TextButton>,
        ],
      },
    });
  }, [
    wsPath,
    isModified,
    uid,
    wsName,
    dispatch,
    dispatchAction,
    isHelpWorkspace,
  ]);
  return null;
}

/**
 * A hook that checks if the user has made any modifications
 * to the help workspace. Will return isModified false is not currently
 * in help workspace.
 * @param {*} checkInterval time to check
 * @returns
 */
function useIsHelpWorkspaceModified(wsPath, checkInterval = 6000) {
  const [isModified, updateModified] = useState(false);

  const wsName = wsPath && resolvePath(wsPath).wsName;

  const isHelpWorkspace = wsName === HELP_FS_WORKSPACE_NAME;

  useEffect(() => {
    let id;
    let effectDestroyed = false;
    if (isHelpWorkspace && wsPath && isValidNoteWsPath(wsPath)) {
      id = setInterval(() => {
        isHelpFileModified(wsPath).then((result) => {
          if (effectDestroyed) {
            return;
          }
          if (result) {
            updateModified(result);
          }
        });
      }, checkInterval);
    }
    return () => {
      effectDestroyed = true;
      if (id != null) {
        clearInterval(id);
      }
    };
  }, [wsPath, wsName, isModified, checkInterval, isHelpWorkspace]);

  useEffect(() => {
    return () => {
      updateModified(false);
    };
  }, [wsName]);

  return { isModified, isHelpWorkspace };
}

async function isHelpFileModified(wsPath) {
  if (!wsPath) {
    return false;
  }
  const { wsName } = resolvePath(wsPath);

  if (wsName !== HELP_FS_WORKSPACE_NAME) {
    return false;
  }

  const wsInfo = await getWorkspaceInfo(wsName);

  if (wsInfo.type !== HELP_FS_WORKSPACE_TYPE) {
    return false;
  }

  const fs = getFileSystemFromWsInfo(wsInfo);

  const isModified = await fs.isFileModified(toFSPath(wsPath));

  return isModified;
}