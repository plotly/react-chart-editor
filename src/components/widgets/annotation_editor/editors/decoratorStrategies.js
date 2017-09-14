/*
 * A decoratorStrategy is used by `draft-js` to determine how to render
 * content beyond inline styles. We use them to render LINK entities.
 *
 * See https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#content
 * and
 * https://facebook.github.io/draft-js/docs/advanced-topics-entities.html#content
 */
import { Entity } from "draft-js";

const characterIsLinkEntity = character => {
  const entityKey = character.getEntity();

  if (entityKey === null) {
    return false;
  }

  const entity = Entity.get(entityKey);

  return entity.getType() === "LINK";
};

export const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(characterIsLinkEntity, callback);
};
