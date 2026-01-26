let userVolume = 0.5;
let isMuted = true;
let canUpdateProgress = true;
let wasPaused = false;

let muteIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 9.50009L21 14.5001M21 9.50009L16 14.5001M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
let unmuteIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0004 9.00009C16.6281 9.83575 17 10.8745 17 12.0001C17 13.1257 16.6281 14.1644 16.0004 15.0001M18 5.29177C19.8412 6.93973 21 9.33459 21 12.0001C21 14.6656 19.8412 17.0604 18 18.7084M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

function swapDefaultVolumeButton(video) {
    const videoContainer = video.parentElement;
    const svg = videoContainer.querySelector('svg');
    const svgContainer = svg.parentElement;
    svgContainer.style.display = 'none';

    const volumeButton = document.createElement('div');
    volumeButton.className = 'volumeButton';
    volumeButton.innerHTML = `<input type="range" value="0" step="0.01" min="0" max="1"></input><div id="toggleMute">${muteIcon}</div>`
    
    svgContainer.before(volumeButton);

    const muteButton = volumeButton.querySelector('#toggleMute');
    const inputSlider = volumeButton.querySelector('input');

    volumeButton.addEventListener('click', (event) => {
        event.stopPropagation();
    })
    
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        
        video.volume = userVolume;
        video.muted = isMuted;
        if (isMuted) {inputSlider.value = 0}
        else {inputSlider.value = userVolume};
        updateMuteButton(muteButton)
    })

    inputSlider.addEventListener('input', () => {
        if (isMuted) {
            isMuted = !isMuted;
            video.muted = isMuted;
        }

        userVolume = inputSlider.value;
        video.volume = inputSlider.value;
        updateMuteButton(muteButton)
    })
}

function updateMuteButton(muteButton) {
    if ((isMuted) || (userVolume == 0)) {muteButton.innerHTML = muteIcon}
    else {muteButton.innerHTML = unmuteIcon}
}

function attachProgressBar(video) {
    const progressBar = document.createElement('input');
    progressBar.className = 'progressBar';
    progressBar.type = 'range';
    progressBar.step = 'any';
    progressBar.min = 0;
    progressBar.value = video.currentTime;

    video.after(progressBar);
    video.addEventListener('timeupdate', () => {
        if (!progressBar.max) {progressBar.max = video.duration}
        if (canUpdateProgress) {progressBar.value = video.currentTime};
    })

    progressBar.addEventListener('mousedown', () => {
        canUpdateProgress = false;
        wasPaused = video.paused;
        video.pause();
    })

    progressBar.addEventListener('mouseup', () => {
        canUpdateProgress = true;
        if (!wasPaused) {video.play()};
    })

    progressBar.addEventListener('input', () => {
        if (!canUpdateProgress) {video.currentTime = progressBar.value};
    })
}

function attachListeners() {
    if (!document.URL.includes('reels')) {return};
    document.querySelectorAll('video').forEach(video => {
        if (video.listenersAttached) {return};

        video.listenersAttached = true;
        swapDefaultVolumeButton(video);
        attachProgressBar(video);
        video.addEventListener('play', onVideoPlay);
    })
}

function onVideoPlay(event) {
    const video = event.target;
    const videoContainer = video.parentElement;
    const volumeButton = videoContainer.querySelector('.volumeButton');
    const muteButton = volumeButton.querySelector('#toggleMute');
    const volumeSlider = volumeButton.querySelector('input');

    //Timeout is needed because otherwise instagram will override these values after they are set
    setTimeout(()=>{
        video.muted = isMuted;
        video.volume = userVolume;
        if (!isMuted) {volumeSlider.value = userVolume};
        updateMuteButton(muteButton);
    },0) 
}

const videosObserver = new MutationObserver(attachListeners);
videosObserver.observe(document.body, {childList:true, subtree:true});