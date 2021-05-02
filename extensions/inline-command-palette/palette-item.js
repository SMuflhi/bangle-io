export const PALETTE_ITEM_REGULAR_TYPE = 'REGULAR_TYPE';
export const PALETTE_ITEM_HINT_TYPE = 'HINT_TYPE';
const allTypes = [PALETTE_ITEM_HINT_TYPE, PALETTE_ITEM_REGULAR_TYPE];

export class PaletteItem {
  static create(obj) {
    return new PaletteItem(obj);
  }
  constructor(obj) {
    const {
      uid,
      title,
      type = PALETTE_ITEM_REGULAR_TYPE,
      description,
      keywords,
      disabled,
      hidden,
      editorExecuteCommand,
      group,
      highPriority,
      skipFiltering,
      ...otherKeys
    } = obj;

    if (Object.keys(otherKeys).length > 0) {
      throw new Error(
        `PaletteItem: the following fields are not recognized "${Object.keys(
          otherKeys,
        ).join(',')}"`,
      );
    }
    if (!allTypes.includes(type)) {
      throw new Error('PaletteItem: Unknown type ' + type);
    }
    if (!group) {
      throw new Error('PaletteItem: group is required');
    }

    this.uid = uid;
    this.title = title;
    this.type = type;
    this.description = description;
    this.keywords = keywords;
    this.disabled = disabled;
    this.hidden = hidden;
    this.editorExecuteCommand = editorExecuteCommand;
    this.group = group;
    this.highPriority = highPriority;
    this.skipFiltering = skipFiltering;
  }
}