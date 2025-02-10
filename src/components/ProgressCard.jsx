import { Lock, Star } from 'lucide-react';
import PropTypes from "prop-types";
import {Wrapper} from "./Wrapper.jsx";

const ProgressCard = ({
                          name,
                          url,
                          backgroundImage = "/api/placeholder/400/200",
                          isBlocked = false,
                          completedSections = [],
                         points = []
                      }) => {
    const sections = completedSections.length; // Number of sections in the card
    const StarBadge = ({ points }) => (
        <div className="relative inline-flex items-center justify-center">
            <div className="absolute">
                <Star className="w-10 h-10 fill-yellow-400 text-yellow-500" />
            </div>
            <span className="relative text-xs font-bold z-10 text-black">
      {points}
    </span>
        </div>
    );
    StarBadge.propTypes = {
        points: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
    return (
        <Wrapper url={url} is isBlocked={isBlocked}>
            <div
                className="relative w-72 h-48 rounded-xl overflow-hidden shadow-lg transition-all duration-300
                hover:shadow-xl hover:animate-pulse hover:ring-2 hover:ring-yellow-600">
                {backgroundImage!=null &&
                    <div className="absolute inset-0">
                    <img
                        src={backgroundImage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                        {isBlocked &&
                    <div className="absolute inset-0 bg-black/40"/>}
                </div>}


                <div className="relative h-full flex flex-col">
                    {/* Card title */}
                    <div className="p-4 flex-grow flex items-center justify-center">
                        <h3 className="text-xl font-bold text-white text-center">
                            {isBlocked ? (
                                <div className="flex items-center gap-2 justify-center">
                                    <Lock className="w-5 h-5"/>
                                    Locked
                                </div>
                            ) : name}
                        </h3>
                    </div>

                    {/* Progress sections */}
                    <div className="flex h-12 mt-auto">
                        {[...Array(sections)].map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 relative  flex flex-col justify-center ${
                                    index !== sections - 1 ? 'border-r border-white/30' : ''
                                } ${
                                    isBlocked
                                        ? 'bg-gray-500/50'
                                        : completedSections[index]
                                            ? 'bg-green-500/50'
                                            : 'bg-gray-500/50'
                                }`}
                            >
                                <div className="flex justify-center items-center h-full">
                                    {points[index] && (
                                        <StarBadge points={points[index]}/>
                                    )}
                                </div>
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: 'linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%)',
                                        backgroundSize: '10px 10px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>

    );
};
ProgressCard.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    backgroundImage: PropTypes.string,
    isBlocked: PropTypes.bool,
    completedSections: PropTypes.array,
    points: PropTypes.array
};
export default ProgressCard;