import PropTypes from "prop-types";
const Wrapper = ({ children, url, isBlocked }) => {
    if (url) {
        return (
            <a
                href={url}
                className="block cursor-pointer"
                onClick={(e) => {
                    if (isBlocked) {
                        e.preventDefault();
                    }
                }}
            >
                {children}
            </a>
        );
    }
    return <>{children}</>;
};
Wrapper.propTypes = {
    children: PropTypes.object,
    url: PropTypes.string,
    isBlocked: PropTypes.bool
};
export {Wrapper}