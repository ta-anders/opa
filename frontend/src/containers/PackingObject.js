import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { updatePackingObject } from '../actions/packingObjects';
import ItemTypes from '../ItemTypes';
import PackingObject from '../components/PackingObject';

const packingObjectSource = {
  beginDrag(props) {
    return { id: props.id, width: props.width, height: props.height };
  },
};

const collect = (conn, monitor) => ({
  connectDragSource: conn.dragSource(),
  isDragging: monitor.isDragging(),
});

const DraggablePackingObject = DragSource(
  ItemTypes.PACKING_OBJECT,
  packingObjectSource,
  collect,
)(PackingObject);

const mapStateToProps = state => ({
  updatingObjects: state.ui.updatingObjects,
});

const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(
    updatePackingObject(sessionId, body, id),
  ),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(DraggablePackingObject);
