import Stack from '../../views/Stack';
import Plain from '../../views/Plain';

function Content({ value }) {
  return (
    <div>
      {value === 'STACK' ? <Stack /> : <Plain />}
    </div>
  )
}

export default Content;
