import axios from 'axios'
import Spinner from '../Spinner/Spinner'

export default function ImageUpload({ errors, setErrors, formData, setFormData, isUploading, setIsUploading }){

    const handleUpload = async (e) => {
        setErrors({ ...errors, profileImage: "" });
        setIsUploading(true);
      
        const imageFile = e.target.files[0];
        const formData = new FormData(); 
        formData.append("file", imageFile);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      
        try {
          
          const { data } = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" }, 
          });
      
          
          setFormData({ ...formData, profileImage: data.secure_url });
      
        } catch (error) {
          setErrors({ ...errors, profileImage: error.response?.data?.error?.message || "Image upload failed" });
        } finally {
          setIsUploading(false);
        }
      };
      

  return (
<div className="input-control">
  <label htmlFor="profileImage">Upload a profile image</label>
  {isUploading && <Spinner />}
  
  {formData.profileImage && (
    <img src={formData.profileImage} alt="Preview" className="image-preview" />
  )}
  
  <input 
    type="file"
    accept="image/*"
    name="profileImage" 
    id="profileImage"
    onChange={handleUpload}
  />
  
  {errors.profileImage && <p className="error-message">{errors.profileImage}</p>}
</div>
  )
}