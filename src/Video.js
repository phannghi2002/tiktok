import video1 from './videos/istockphoto-1031669488-640_adpp_is.mp4'
import { forwardRef, useImperativeHandle } from 'react'

function Video(props, ref) {

    //const videoRef = useRef()
    useImperativeHandle(ref,()=> ({
        play(){
            props.ref.play()
        },
        pause(){
            props.ref.pause()
        }
    }))
    return (
        <video
            ref={ref}
            src={video1}
            width={500}
        />
    )
}

export default forwardRef(Video)