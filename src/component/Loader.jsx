import { Triangle } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>

            <div className="container d-flex justify-content-center align-items-center" style={{position: 'fixed', top:'0', left:'0', width:'100%', height:'100%'}}>
                <div className=''>
                    <Triangle
                        visible={true}
                        height="100"
                        width="100"
                        color="#1F1F1F"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
    )
}

export default Loader;