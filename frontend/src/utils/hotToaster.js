import { Toaster} from 'react-hot-toast';

export const hotToaster = () => {
    return(
        <>

        <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: 'f5f3f3',
      color: 'black',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
</>
    )
}