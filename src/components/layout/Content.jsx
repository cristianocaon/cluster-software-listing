import Stack from '../../views/Stack';
import Plain from '../../views/Plain';

function Content({ value, data, partition }) {
  return (
    <div>
      {value === 'STACK' ? <Stack data={data} partition={partition} /> : <Plain data={data} partition={partition} />}
    </div>
  )
}

export default Content;
