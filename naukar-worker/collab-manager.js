import { LocalDisk } from '@bangle.dev/collab-client';
import { Manager } from '@bangle.dev/collab-server';
import { getNote, saveNote } from 'workspace/index';

export function setupCollabManager(bangleIOContext) {
  const manager = new Manager(bangleIOContext.specRegistry.schema, {
    disk: localDisk(bangleIOContext),
  });
  return manager;
}

function localDisk(
  bangleIOContext,
  defaultContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Hi there,',
          },
        ],
      },
    ],
  },
) {
  return new LocalDisk({
    getItem: async (wsPath) => {
      const doc = await getNote(bangleIOContext, wsPath);
      if (!doc) {
        return defaultContent;
      }
      return doc;
    },
    setItem: async (wsPath, doc) => {
      await saveNote(bangleIOContext, wsPath, doc);
    },
  });
}