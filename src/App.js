import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  fetchData,
  nextImage,
  prevImage,
  setArtId,
  reset
} from './features/dataSlice';

const mapStateToProps = state => ({ artId: state.data.artId });

function App({ artId }) {
  const dispatch = useDispatch();
  const currentState = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [artId, dispatch])

  const renderImage = () => {
    return currentState.apiData? (
      <img src={currentState.apiData?.primaryImage} />
    ) : (
      <h3>No image available</h3>
    );
  };

  return (
    <div className='App'>
      <div className='button-container'>
        <button onClick={
          () => dispatch(fetchData())
        }>Trigger Thunk</button>

        <button onClick={
          () => dispatch(reset())
        }>Reset</button>

        <button onClick={
          () => dispatch(nextImage())
        }>Next Image</button>

        <button onClick={
          () => dispatch(prevImage())
        }>Back</button>

      </div>
      <div className='input-controls'>
        <h1>{currentState.artId}</h1>
        <input
          type="text"
          value={currentState.artId}
          onChange={
            e => dispatch(setArtId(e.target.value))
          }
        />
        </div>
        <div className='image-container'>
          {
            renderImage()
          }
        </div>
      </div>
      );
}

export default connect (mapStateToProps)(App);