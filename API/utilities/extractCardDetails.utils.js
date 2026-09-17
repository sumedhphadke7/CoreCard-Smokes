function getCardIssueDate(card) {
    return card.AdditionalCardDetails?.[0]?.CardIssueDate || null;
}

function getMostRecentCard(cards) {
    return cards.reduce( (latestCard, currentCard) => {
        const latestCardIssueDate = getCardIssueDate(latestCard);
        const currentCardIssueDate = getCardIssueDate(currentCard);

        if(!latestCardIssueDate) {
            return currentCard;
        };

        if(!currentCardIssueDate) {
            return latestCard;
        }

        // This would fail in the test environment if there are two cards with the same issue date.
        // IRL scenario, this would never break because it's an edge case that a customer looses their card and requests a replacement on the same day

        // This would be handled in future if needed by introducing the card sequence number logic where if there are two cards active and having same issue date,
        // it'll return the card with lower sequence number as that's the primary card they were issued and is still active.

        return new Date(currentCardIssueDate) > new Date (latestCardIssueDate) ? currentCard : latestCard;
    });
};

function getActiveCardDetails(responseData) {
    const cards = responseData?.EmbossingDetails || [];

    if (cards.length === 0) {
        throw new Error("No card details found in the response data.");
    }

    // Single card in the account, return that card information directly despite it's manual status
    if (cards.length === 1) {
        return cards[0];
    }

    // Multiple cards on the account returned in the API Response, find the active card and return it's information
    const activeCards = cards.filter(card =>
        card.CardManualStatus?.toLowerCase() === "active"
    );

    // Multiple cards on the account but only 1 active card present, return card information for the active card
    if(activeCards.length === 1) {
        return activeCards[0];
    }

    // If multiple cards on account with Active status, return the card information for the most recently issued card (as per the CardIssueDate)
    if (activeCards.length > 1) {
        return getMostRecentCard(activeCards);
    }
};

module.exports = { getActiveCardDetails };