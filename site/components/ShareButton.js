import React, { useState } from 'react';
import { Button } from 'theme-ui';
import Icon from '@hackclub/icons';

function ShareButton({ navigator, urlFriendlyName }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleClick = async () => {
    try {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        await navigator.share({
          title: 'Check out this link!',
          url: "https://directory.hackclub.com/" + urlFriendlyName
        });
        setIsLinkCopied(true);
      } else {
        await navigator.clipboard.writeText(
          "https://directory.hackclub.com/" + urlFriendlyName
        );
        setIsLinkCopied(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Button
      as="a"
      sx={{
        backgroundColor: isLinkCopied ? "#EC3750" : "#FDEBED",
        justifyContent: "row",
        alignItems: "center",
        display: "flex",
        fontWeight: 500,
        mx: [2, 3],
        color: isLinkCopied ? "#FDEBED" : "#EC3750",
        px: 3,
        py: 1,
      }}
      onClick={handleClick}
    >
      {/Mobi|Android/i.test(navigator.userAgent) ? (
        <>
          <Icon glyph="share" px={0} size={24} />
          {isLinkCopied ? "Shared" : "Share"}
        </>
      ) : (
        <>
          <Icon glyph="link" px={0} size={24} />
          {isLinkCopied ? "Copied Link" : "Copy Link"}
        </>
      )}
    </Button>
  );
}

export default ShareButton;
