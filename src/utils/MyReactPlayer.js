import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

import { HiMiniPlay } from 'react-icons/hi2'
import { AiOutlinePause } from 'react-icons/ai'

import { FiRotateCw, FiRotateCcw } from 'react-icons/fi'
import { BsFullscreen, BsFullscreenExit, BsPip, BsVolumeUpFill } from 'react-icons/bs'
import { IoVolumeMuteSharp } from 'react-icons/io5'

import Duration from './Duration'
import CustomRangeInput from '../components/utils/CustomRangeInput'


const MyReactPlayer = ({ url }) => {

    const playerRef = useRef();
    const [showControls, setShowControls] = useState(false)

    const [player, setPlayer] = useState({
        playing: false,
        played: 0,
        seeking: false,
        duration: 0,
        pip: false,
        playbackRate: 1,
        volume: 1,
        mute: false
    })

    const toggleVideoPlay = () => {
        setPlayer(prev => ({ ...prev, playing: !prev.playing }))
    }

    const handleSeekMouseDown = () => {
        setPlayer(prev => ({ ...prev, seeking: true }))
    }

    const handleSeekChange = (e) => {
        setPlayer(prev => ({ ...prev, played: parseFloat(e.target.value) }))
    }
    const handleSeekMouseUp = (e) => {
        setPlayer(prev => ({ ...prev, seeking: false }))
        playerRef.current?.seekTo(parseFloat(e.target.value))
    }

    const seekToPrevFrame = () => {
        let oneSecFrac = 1 / player.duration;
        let nextFrameFrac = player.played - (oneSecFrac * 10);
        if (nextFrameFrac >= 0.0001) {
            playerRef.current.seekTo(nextFrameFrac)
            setPlayer(prev => ({ ...prev, played: nextFrameFrac }))
        } else {
            playerRef.current.seekTo(0.00)
            setPlayer(prev => ({ ...prev, played: 0 }))
        }
    }


    const seekToNextFrame = () => {
        let oneSecFrac = 1 / player.duration;
        let nextFrameFrac = player.played + (oneSecFrac * 10);
        if (nextFrameFrac <= 1) {
            playerRef.current.seekTo(nextFrameFrac)
            setPlayer(prev => ({ ...prev, played: nextFrameFrac }))
        } else {
            playerRef.current.seekTo(1.000)
            setPlayer(prev => ({ ...prev, played: 1 }))
        }
    }

    const handleDuration = (duration) => {
        setPlayer(prev => ({ ...prev, duration: duration }))
    }

    const handleProgress = state => {
        if (!player.seeking) {
            setPlayer(prev => ({ ...prev, played: state.played }))
        }
    }

    const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPlayer(prev => ({ ...prev, pip: true }))
    }

    const handleDisablePIP = () => {
        console.log('onDisablePIP')
        setPlayer(prev => ({ ...prev, pip: false }))
    }

    const handleTogglePIP = () => {
        setPlayer(prev => ({ ...prev, pip: !prev.pip }))
    }

    const handleVolumeChange = (e) => {
        setPlayer(prev => ({ ...prev, volume: parseFloat(e.target.value) }))
    }


    const playerContainerRef = useRef()
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleToggleFullScreen = () => {
        playerContainerRef.current?.requestFullscreen();
        if (!isFullScreen) {
            if (playerContainerRef.current.requestFullscreen) {
                playerContainerRef.current.requestFullscreen().catch((err) => { })
            } else if (playerContainerRef.current.mozRequestFullScreen) { // Firefox
                playerContainerRef.current.mozRequestFullScreen().catch((err) => { })
            } else if (playerContainerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                playerContainerRef.current.webkitRequestFullscreen().catch((err) => { })
            } else if (playerContainerRef.current.msRequestFullscreen) { // IE/Edge
                playerContainerRef.current.msRequestFullscreen().catch((err) => { })
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document?.exitFullscreen().catch((err) => { })
            } else if (document.mozCancelFullScreen) { // Firefox
                document?.mozCancelFullScreen().catch((err) => { })
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document?.webkitExitFullscreen().catch((err) => { })
            } else if (document.msExitFullscreen) { // IE/Edge
                document?.msExitFullscreen().catch((err) => { })
            }
            setIsFullScreen(false);
        }
    };


    const timeoutIds = useRef([]);

    useEffect(() => {
        timeoutIds.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutIds.current = [];
    }, []);

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeouts();
        const timeoutId = setTimeout(() => {
            setShowControls(false);
        }, 2000);
        timeoutIds.current.push(timeoutId);
    };

    const clearTimeouts = () => {
        timeoutIds.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutIds.current = [];
    };

    const [showOtherOptions, setShowOtherOptions] = useState(false);

    const handleChangePlayBack = (playbackRate) => {
        setShowOtherOptions(false)
        setPlayer(prev => ({ ...prev, playbackRate: parseFloat(playbackRate) }))
    }

    const handleToggleMute = () => {
        setPlayer(prev => ({ ...prev, mute: !prev.mute }))
    }

    return (
        <div className='myCustomVideoPlayer'
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            ref={playerContainerRef}
        // onMouseLeave={() => setShowControls(false)}
        >
            <ReactPlayer
                url={url}
                width={"100%"}
                height={"100%"}
                ref={playerRef}
                playing={player?.playing}
                onDuration={handleDuration}
                onProgress={handleProgress}
                loop={false}
                onEnablePIP={handleEnablePIP}
                onDisablePIP={handleDisablePIP}
                pip={player.pip}
                playbackRate={player.playbackRate}
                volume={player.volume}
                muted={player.mute}
                playsinline={true}
            />
            {/* controls  */}
            <div className={`bottomControls ${showControls ? "show" : "hide"}`}>

                <CustomRangeInput
                    className='playerSeekBar'
                    type='range'
                    min={0}
                    max={0.999999}
                    step='any'
                    value={player.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />

                <div className='playerFooterScreen'>
                    <div className='flexRowGap5'>
                        <FiRotateCcw className={"playerActionBtn"} onClick={seekToPrevFrame} size={22} />

                        {
                            player.playing ? (
                                <AiOutlinePause className={"playerActionBtn"} onClick={toggleVideoPlay} size={30} />
                            ) : (
                                <HiMiniPlay className={"playerActionBtn"} onClick={toggleVideoPlay} size={30} />
                            )
                        }
                        <FiRotateCw className={"playerActionBtn"} onClick={seekToNextFrame} size={22} />

                        <div className='playbackRateFixer'>
                            <span className='selectedPlayback' onClick={() => setShowOtherOptions(prev => !prev)}>{player.playbackRate}x</span>
                            {
                                showOtherOptions && (
                                    <div className='playbackOptions'>
                                        <button onClick={() => handleChangePlayBack("1")}>1x</button>
                                        <button onClick={() => handleChangePlayBack("1.5")}>1.5x</button>
                                        <button onClick={() => handleChangePlayBack("2")}>2x</button>
                                    </div>
                                )
                            }
                        </div>

                        <div className='volumButtonWithSlider'>
                            <CustomRangeInput
                                disabled={player?.mute}
                                className='volumeRangeSlider'
                                type='range'
                                min={0}
                                max={1}
                                step='any'
                                value={player.volume}
                                onChange={handleVolumeChange}
                            />
                            {
                                player.mute ? (
                                    <IoVolumeMuteSharp onClick={handleToggleMute} className='playerActionBtn' size={25} />

                                ) : (
                                    <BsVolumeUpFill onClick={handleToggleMute} className='playerActionBtn' size={25} />
                                )
                            }
                        </div>

                    </div>
                    <div className='flexRowGap5'>

                        <div className='playerDuration'>
                            <Duration className={"text-white"} seconds={player?.duration * player?.played} />
                            <span className='text-white'>/</span>
                            <Duration className={"text-white"} seconds={player?.duration} />
                        </div>
                        <BsPip className='playerActionBtn' size={22} onClick={handleTogglePIP} />
                        {
                            isFullScreen ? (
                                <BsFullscreenExit className='playerActionBtn' size={18} onClick={handleToggleFullScreen} />
                            ) : (
                                <BsFullscreen className='playerActionBtn' size={18} onClick={handleToggleFullScreen} />
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyReactPlayer