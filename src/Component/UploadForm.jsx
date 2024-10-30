import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import "./index.css"

const SinglePageWebsite = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    discripiton: 'May the divine light of Diwali bring peace, prosperity, and happiness to your life. Wishing you and your family a joyous celebration!',
    file: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
   

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submitData = new FormData(); // Create FormData object
    submitData.append('name', formData.name);
    submitData.append('discripiton', formData.discripiton);
    if (formData.file) {
        submitData.append('file', formData.file); 
        // console.log(submitData)// Append file if exists
    }
    const apiUrl = 'https://diwali-be-2.onrender.com/api/v1/user'; // Replace with your API URL
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: submitData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log('Success:', result);
        // Navigate or do something with the result
        navigate(`/Card/${result.result.id}`); // Assuming the API returns the created item's ID
    } catch (error) {
        console.error('Error submitting form:', error);
    } finally {
        setIsSubmitting(false);
    }
    // console.log('Form submitted:', formData);
    const id=5;
    setIsSubmitting(false);
    // navigate(`Card/${id}`)
  };

  return (
    <div className="min-h-screen  text-white bg">

      {/* Header Section */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
        Illuminate Your Wishes
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-[#162036]/50 backdrop-blur-sm rounded-sm p-8 shadow-xl ">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1E2A4A] rounded-lg px-4 py-3 border border-blue-500/20 
                          focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40
                          placeholder-blue-300/30 text-blue-100"
                placeholder="Enter item name..."
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Description
              </label>
              <textarea
                value={formData.discripiton}
                onChange={(e) => setFormData({ ...formData, discripiton: e.target.value })}
                rows={4}
                className="w-full bg-[#1E2A4A] rounded-lg px-4 py-3 border border-blue-500/20 
                          focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40
                          placeholder-blue-300/30 text-blue-100"
                placeholder="May the divine light of Diwali bring peace, prosperity, and happiness to your life. Wishing you and your family a joyous celebration!"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Upload Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0 file:text-sm file:font-medium
                            file:bg-blue-500/20 file:text-blue-200 hover:file:bg-blue-500/30
                            text-blue-200 text-sm"
                  required
                />
              </div>
              {previewUrl && (
                <div className="mt-4 relative group">
                  <div className="w-40 h-40 rounded-lg overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white
                        bg-gradient-to-r from-blue-600 to-blue-700
                        hover:from-blue-500 hover:to-blue-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50
                        transform transition-all duration-200
                        hover:scale-[1.02] active:scale-[0.98]
                        disabled:opacity-70 disabled:cursor-not-allowed
                        shadow-lg hover:shadow-blue-500/25 ${isSubmitting ? 'animate-pulse' : ''}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Item'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-blue-300/50 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default SinglePageWebsite;