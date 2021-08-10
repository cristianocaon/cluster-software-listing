// import axios from 'axios'

// const PROTO = 'https://';
// const ADDR = 'cluster.hpcc.ttu.edu';
// const PORT = '80';
// const PAGE = '/app-list/stack';

// const getData = async (setData, setLoading, setError) => {
//   let url = PROTO + ADDR + ':' + PORT + PAGE;

//   try {
//     const { data } = await axios.get(url)
//     console.log(data);
//     if (!data.error) {
//       let { charts, partitions } = data;
//       setData({ charts, partitions });
//     } else {
//       setError(data.error);
//     }
//     setLoading(false);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

import data from './lmod_stack.json';

function getData(setData, setLoading, setError) {
  setData(data);
  setLoading(false);
  return data;
}

export default getData;