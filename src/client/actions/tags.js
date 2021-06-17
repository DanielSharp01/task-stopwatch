export const RECIEVE_TAG_RESPONSE = "RECIEVE_TAG_RESPONSE";
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

export function recieveTagResponse(tag) {
  return {
    type: RECIEVE_TAG_RESPONSE,
    tag
  };
}

export function changeTagColor(name, nextColor) {
  return async (dispatch, getState) => {
    const { tags } = getState();
    const oldColor = tags[name].color;
    try {
      dispatch(changeTagColorStore(name, nextColor));
      let result = await fetch(`api/tags/${name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          color: nextColor
        })
      });
      let json = await result.json();
      dispatch(recieveTagResponse(json.result));
    } catch (err) {
      dispatch(changeTagColorStore(name, oldColor));
    }
  };
}

function changeTagColorStore(name, nextColor) {
  return {
    type: CHANGE_TAG_COLOR,
    name,
    nextColor
  };
}
