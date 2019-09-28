import apiAuth from "../middlewares/apiAuth";
import { getTag, getTags, createTag, changeTag, deleteTag, renderTag, renderTags } from "../middlewares/tags";

export default (router, objectRepository) => {
  router.get("/tags", apiAuth(), getTags(objectRepository), renderTags());
  router.post("/tags", apiAuth(), createTag(objectRepository), renderTag());
  router.get("/tags/:name", apiAuth(), getTag(objectRepository), renderTag());
  router.patch("/tags/:name", apiAuth(), getTag(objectRepository), changeTag(), renderTag());
  router.delete("/tags/:name", apiAuth(), getTag(objectRepository), deleteTag(), renderTag());
};
