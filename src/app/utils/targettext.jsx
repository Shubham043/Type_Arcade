import axios from "axios";

export const targetText = async ()=>{
 
    try {
      const token = localStorage.getItem("jwttoken");
      if (!token) {
        alert("No token found!");
        return;
      }

      const response = await axios.get("https://typearcade-backend.onrender.com/test/starttest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        return response.data.mainText
      }
       
    } catch (error) {
      alert(error);
      console.log("Error starting test:", error.response ? error.response.data : error.message);
    }
  };
  
  
