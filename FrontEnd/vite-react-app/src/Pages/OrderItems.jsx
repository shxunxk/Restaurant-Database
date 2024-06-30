import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const OrderItems = () => {

    const {id} = useParams()

    const [data, setData] = useState()

    console.log(id)
    useEffect(() => {
        axios.get('http://localhost:3000/orderitems',{
            params:{order_id:id}
        })
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

      console.log(data)

    return(
        <div>

        </div>
    )
}

export default OrderItems