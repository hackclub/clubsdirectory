import React, { useState } from 'react';
import { Button } from 'theme-ui';
import Icon from '@hackclub/icons';

function EmbedMapButton({ navigator, urlFriendlyName }) {
  const [isEmbedCopied, setIsEmbedCopied] = useState(false);

  const handleClick = async () => {
    try {
      const embedCode = `<iframe src="https://directory.hackclub.com/map/${urlFriendlyName}" width="100%" height="500px" frameborder="0"></iframe>`;
      await navigator.clipboard.writeText(embedCode);
      setIsEmbedCopied(true);

    } catch (error) {
      console.log(error.message);
    }
  };

  const buttonText = isEmbedCopied ? "Copied Map Embed Code" : "Embed Map View";

  return (
    <Button
      as="a"
      sx={{
        backgroundColor: isEmbedCopied ? "blue" : "#338EDA10",
        justifyContent: "row",
        alignItems: "center",
        display: "flex",
        fontWeight: 500,
        mx: [2, 3],
        color: !isEmbedCopied ? "blue" : "#EAF3FB",
        px: 3,
        py: 1,
      }}
      onClick={handleClick}
    >
      <>
        <Icon glyph="embed" px={0} size={24} />
        {buttonText}
      </>
    </Button>
  );
}

export default EmbedMapButton;
