const getCoordinates = () => {
  const coordinates = {x: 0, y: 0};

  const rect = document.getElementsByClassName('text-editor')[0].getBoundingClientRect();

  const LINK_POP_UP_WIDTH = 158.5;

  if (rect) {
    // Add to the offset
    coordinates.x += rect.width * 0.5 - LINK_POP_UP_WIDTH / 2;
    coordinates.y += rect.height * 0.5;
  }

  return coordinates;
};

export default getCoordinates;
