export const NEW_TAGS_ADD_TAG = "NEW_TAGS_ADD_TAG";
export const NEW_TAGS_CHANGE_TAG_NAME = "NEW_TAGS_CHANGE_TAG_NAME";
export const CHANGE_TAG_COLOR = "CHANGE_TAG_COLOR";

export function newTagsAddTag(name, color) {
  return {
    type: NEW_TAGS_ADD_TAG,
    name,
    color
  };
}

export function newTagsChangeTagName(name, nextName) {
  return {
    type: NEW_TAGS_CHANGE_TAG_NAME,
    name,
    nextName
  };
}

export function changeTagColor(name, nextColor) {
  return {
    type: CHANGE_TAG_COLOR,
    name,
    nextColor
  };
}
