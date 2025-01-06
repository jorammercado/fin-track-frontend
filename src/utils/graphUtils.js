export const calculateGraphWidth = (screenWidth, margin) => {
    const screenWidths = [
        { maxWidth: 1660, width: 1400 },
        { maxWidth: 1560, width: 1350 },
        { maxWidth: 1460, width: 1300 },
        { maxWidth: 1360, width: 1250 },
        { maxWidth: 1280, width: 1200 },
        { maxWidth: 1215, width: 1150 },
        { maxWidth: 1165, width: 1100 },
        { maxWidth: 1100, width: 1065 },
        { maxWidth: 1024, width: 1000 },
        { maxWidth: 950, width: 930 },
        { maxWidth: 890, width: 870 },
        { maxWidth: 840, width: 820 },
        { maxWidth: 790, width: 770 },
        { maxWidth: 740, width: 720 },
        { maxWidth: 700, width: 680 },
        { maxWidth: 650, width: 630 },
        { maxWidth: 615, width: 590 },
        { maxWidth: 570, width: 550 },
        { maxWidth: 540, width: 520 },
        { maxWidth: 520, width: 500 },
        { maxWidth: 500, width: 480 },
        { maxWidth: 480, width: 460 },
        { maxWidth: 460, width: 440 },
        { maxWidth: 440, width: 420 },
        { maxWidth: 420, width: 400 },
        { maxWidth: 400, width: 380 },
        { maxWidth: 380, width: 360 },
        { maxWidth: 370, width: 355 },
    ]

    if (screenWidth <= 370) {
        return 330 - margin.left - margin.right
    }

    const selectedWidth = screenWidths.find(({ maxWidth }) => screenWidth > maxWidth)?.width

    return selectedWidth - margin.left - margin.right
}
