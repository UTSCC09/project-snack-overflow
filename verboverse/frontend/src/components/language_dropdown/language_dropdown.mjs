import React, { useState, useRef } from 'react';
import { Popper, ClickAwayListener } from '@mui/base';
import { Typography, Button, MenuItem, MenuList } from '@mui/material';
import { styled } from '@mui/joy';
import { langs } from './languages.mjs';
import './language_dropdown.css';

const Popup = styled(Popper)({
    zIndex: 1000,
});

const LanguageDropdown = () => {
    const buttonRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [language, setLanguage] = useState('English');

    const handleCloseDropdown = () => {
        setOpenDropdown(false);
      };
    
    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
        setOpenDropdown(false);
        } else if (event.key === 'Escape') {
        buttonRef.current.focus();
        setOpenDropdown(false);
        }
    };

    return(
      <div id="language_select">
        <Typography color="black" align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
            Primary Language:
        </Typography>
          <Button
              ref={buttonRef}
              id="composition-button"
              aria-controls={'composition-menu'}
              aria-haspopup="true"
              aria-expanded={openDropdown ? 'true' : undefined}
              color="secondary"
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                  setOpenDropdown(!openDropdown);
              }}
          >
              {language}
          </Button>
          <Popup
              role={undefined}
              id="composition-menu"
              open={openDropdown}
              anchorEl={buttonRef.current}
              disablePortal
              modifiers={[
              {
                  name: 'offset',
                  options: {
                  offset: [0, 4],
                  },
              },
              ]}
          >
              <ClickAwayListener
              onClickAway={(event) => {
                  if (event.target !== buttonRef.current) {
                  handleCloseDropdown();
                  }
              }}
              >
              <MenuList
                  onKeyDown={handleListKeyDown}
                  sx={{ boxShadow: 'md' }}
              >
                  {langs.map(([lang, [id]]) => (
                      <MenuItem key={id} onClick={ () => { handleCloseDropdown(); setLanguage(lang);}}>{lang}</MenuItem>
                  ))}
              </MenuList>
              </ClickAwayListener>
          </Popup>
      </div>
    );
}

export default LanguageDropdown;