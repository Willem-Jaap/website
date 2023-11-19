const isMobile = () => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(max-width: 767px)').matches;
};

export default isMobile;
