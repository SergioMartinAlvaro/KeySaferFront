import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const EditCity = () => {
    const params = useParams();
    const [name, setName] = useState('');
    return(
        <div>
            <h2>Edit City</h2>
        </div>
    )
}

export default EditCity;