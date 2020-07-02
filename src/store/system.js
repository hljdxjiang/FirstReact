export const ISMOBILE = "ISMOBILE";
export const COLLAPSED = "COLLAPSED";
const minWidth = 768;

const defaultstate = {
  ismobile: false,
  collapsed: false,
  iheight: 768,
  span: 8,
};
const system = (state = defaultstate, action) => {
  switch (action.type) {
    case ISMOBILE: {
      const width = window.innerWidth;
      var span = 0;
      if (window.innerWidth < 576) {
        span = 24;
      } else if (window.innerWidth >= 400 && window.innerWidth < 768) {
        span = 12;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1366) {
        span = 8;
      } else {
        span = 6;
      }
      return {
        ismobile: width <= minWidth,
        span: span,
      };
    }
    case COLLAPSED: {
      return { collapsed: !state.collapsed };
    }
    default:
      return state;
  }
};
export { system };
