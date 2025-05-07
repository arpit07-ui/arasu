import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllGallery } from "../services/galleryService";

// TypeScript interfaces
interface CardData {
  id: string;
  title: string;
  images: string[];
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: CardData[];
}

interface ActiveImageIndexes {
  [key: string]: number;
}

const GalleryCard = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeImageIndexes, setActiveImageIndexes] =
    useState<ActiveImageIndexes>({});
  const autoSlideInterval = 3000; // 3 seconds between slides
  const autoSlideTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Fetch data from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response: ApiResponse = await getAllGallery();
        const visibleCards = response.data.filter((card) => card.visibility);
        setCards(visibleCards);

        // Initialize active image indexes for each card
        const initialIndexes: ActiveImageIndexes = {};
        visibleCards.forEach((card) => {
          initialIndexes[card.id] = 0;
        });
        setActiveImageIndexes(initialIndexes);
      } catch (err) {
        setError("Failed to fetch cards. Please try again later.");
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Setup auto-sliding for all cards
  useEffect(() => {
    cards.forEach((card) => {
      if (card.images && card.images.length > 1) {
        startAutoSlide(card.id);
      }
    });

    return () => {
      // Clear all intervals on unmount
      Object.values(autoSlideTimers.current).forEach((timer) => {
        clearInterval(timer);
      });
    };
  }, [cards]);

  // Start auto-sliding for a specific card
  const startAutoSlide = (cardId: string) => {
    // Clear any existing interval for this card
    if (autoSlideTimers.current[cardId]) {
      clearInterval(autoSlideTimers.current[cardId]);
    }

    // Set new interval
    const card = cards.find((c) => c.id === cardId);
    if (!card || !card.images || card.images.length <= 1) return;

    autoSlideTimers.current[cardId] = setInterval(() => {
      setActiveImageIndexes((prev) => ({
        ...prev,
        [cardId]: (prev[cardId] + 1) % card.images.length,
      }));
    }, autoSlideInterval);
  };

  // Open modal with selected card
  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setCurrentImageIndex(activeImageIndexes[card.id] || 0);
    setModalOpen(true);

    // Pause auto-sliding when modal is open
    Object.values(autoSlideTimers.current).forEach((timer) => {
      clearInterval(timer);
    });
  };

  // Close modal and restart auto-sliding
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);

    // Restart auto-sliding
    cards.forEach((card) => {
      if (card.images && card.images.length > 1) {
        startAutoSlide(card.id);
      }
    });
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to next image in modal
  const nextImage = () => {
    if (!selectedCard?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedCard.images.length);
  };

  // Navigate to previous image in modal
  const prevImage = () => {
    if (!selectedCard?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedCard.images.length - 1 : prev - 1
    );
  };

  // Handle thumbnail click in modal
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="font-rethink container mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center mb-6">
        Gallery Items
      </h1>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              {card.images && card.images.length > 0 ? (
                <img
                  src={card.images[activeImageIndexes[card.id] || 0]}
                  alt={card.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/400/320";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <img src="/api/placeholder/400/320" alt="placeholder" />
                </div>
              )}

              {/* Image counter indicator for cards with multiple images */}
              {card.images && card.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                  {(activeImageIndexes[card.id] || 0) + 1}/{card.images.length}
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 truncate">
                {card.title}
              </h2>
              <p className="text-sm text-gray-500">
                Created: {formatDate(card.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No cards message */}
      {cards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cards available to display.</p>
        </div>
      )}

      {/* Modal with image slider */}
      {modalOpen && selectedCard && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedCard.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {/* Image slider */}
              {selectedCard.images && selectedCard.images.length > 0 ? (
                <div className="mb-4">
                  <div className="relative">
                    <img
                      src={selectedCard.images[currentImageIndex]}
                      alt={`${selectedCard.title} ${currentImageIndex + 1}`}
                      className="w-full h-64 md:h-80 object-contain bg-gray-100 rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/400/320";
                      }}
                    />

                    {/* Navigation buttons */}
                    {selectedCard.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                          {currentImageIndex + 1}/{selectedCard.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {selectedCard.images.length > 1 && (
                    <div className="grid grid-cols-6 gap-2 mt-4">
                      {selectedCard.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedCard.title} ${index + 1}`}
                          className={`w-full h-16 object-cover rounded cursor-pointer transition-all duration-200 ${
                            currentImageIndex === index
                              ? "border-2 border-blue-500 opacity-100"
                              : "border border-gray-200 opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/100/100";
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 bg-gray-100 h-64 flex items-center justify-center rounded">
                  <img src="/api/placeholder/400/320" alt="placeholder" />
                </div>
              )}

              {/* Card details */}
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {formatDate(selectedCard.createdAt)}
                </div>
                <div>
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {formatDate(selectedCard.updatedAt)}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
