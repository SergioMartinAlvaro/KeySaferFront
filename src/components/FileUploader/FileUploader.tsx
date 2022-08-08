import React from 'react';
 
const FileUpload = ({evento}:any) => {
      return (
        <div className="file__container">
          <input type="file" onChange={(e:any) => evento(e.target.files[0], e.target.files[0].name)} />
        </div>
      );
}
 
export default FileUpload;