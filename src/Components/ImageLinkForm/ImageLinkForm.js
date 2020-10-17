import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>{'This brain has an ability to detect faces in your images. Give it a shot !!!'}</p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 center w-70' type='text' onChange={onInputChange}/>
                    <button className='w-30 f4 link dib white bg-light-purple grow ph3 pv2' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;