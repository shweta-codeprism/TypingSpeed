import * as React from 'react';

type Props = {
  index: number,
  text: Array<string>,
};

const Text  = (props: Props) => {
  const { index, text } = props;

  return (
    <div>
      {
        text.map((text, idx) => {
          if (idx !== index) {
            return text+' ';
          } else {
            return <b key={index}>{`${text} `}</b>;
          }
        })
      }
    </div>
  );
}

export default Text;
