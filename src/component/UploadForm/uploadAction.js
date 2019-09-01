import axios from "axios";
import Cookies from "js-cookie";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../app/features/async/asyncActions";

export const addImage = photo => async dispatch => {
  dispatch(asyncActionStart());
  console.log(photo.image.type);
  try {
    const uploadConfig = await axios.get("http://localhost:5000/api/upload", {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });
    console.log(uploadConfig.data.url);
    const upload = await axios.put(uploadConfig.data.url, photo.image, {
      headers: {
        "Content-Type": photo.image.type
      }
    });

    console.log(upload);
    //   const res = await axios.post("/api/equipment", {
    //     name: uploadConfig.data.key,
    //     url: uploadConfig.data.key
    //   });

    //   console.log(res.data.url);
    //   const addEquipment = await axios.put("/api/set_equipment", {
    //     photo: `https://s3-ap-southeast-1.amazonaws.com/test-social-123/${
    //       res.data.url
    //     }`,
    //     type
    //   });
    //   dispatch(setUser());
    //   dispatch(getEquipImages(type));
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};
