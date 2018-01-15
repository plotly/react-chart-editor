import Panel from './Panel';
import Fold from './Fold';
import {connectLayoutToPlot, connectAxesToLayout} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);

const AxesFold = connectAxesToLayout(Fold);

export {LayoutPanel, AxesFold};
