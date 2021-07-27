import axios from "axios"
export default function checkSession(){
    if((localStorage.token==undefined) || (localStorage.usertype==undefined)){
        return false;
      }

      axios({
          method: 'post',
          url: 'http://localhost/student-management-system/validation.php',
          data: {
              "token":localStorage.getItem("token"),
              "usertype":localStorage.getItem("usertype")
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.code==="3003"){
              localStorage.clear()
              return false;
            }
            return true;
        })
        .catch((err)=>{
            return err;
        })
}
