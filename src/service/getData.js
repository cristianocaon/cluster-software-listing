// import axios from 'axios';

// const PROTO = 'https://';
// const ADDR = 'cluster.hpcc.ttu.edu';
// // const PORT = '80';
// const PAGE = '/app-list/stack';

// export default async function getData(setData, setLoading, setError) {
//   let url = PROTO + ADDR + PAGE;

//   try {
//     const { data } = await axios.get(url);
//     console.log(data);
//     if (!data.error) {
//       setData(data);
//     } else {
//       setError(data.error);
//     }
//     setLoading(false);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

import data from './lmod_stack.json';

export default function getData(setData, setLoading, setError) {
  setData(data);
  setLoading(false);
  return data;
}
