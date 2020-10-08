import React, {useState} from 'react'
import ImageCapture from './ImageCapture'

function PreviewImage() {
    const [dataURI, setDataURI] = useState('')
    return (
        <div>
            {dataURI.length > 0 ? 
            <div className="output">
                <h1>At Preview Page</h1>
                <img src={dataURI} alt="Icon" />
            </div> : 
            <ImageCapture setDataURI={setDataURI} />}                        
        </div>
    )
}

export default PreviewImage

