import React, { useState, useRef } from 'react';
import { Popper, ClickAwayListener } from '@mui/base';
import { Avatar, Drawer, Sheet, DialogTitle, ModalClose, Divider, DialogContent, Typography,
         MenuItem, Button, MenuList, styled } from '@mui/joy';
import { langs } from './languages.mjs';
import './account_profile.css';

const Popup = styled(Popper)({
    zIndex: 1000,
});

const AccountProfile = () => {
    const buttonRef = useRef(null);
    const [openProfile, setOpenProfile] = useState(false);
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
        <div>
            <Avatar onClick={() => setOpenProfile(true)}/>
            <Drawer
                size="md"
                variant="plain"
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                slotProps={{
                content: {
                    sx: {
                    bgcolor: 'transparent',
                    p: { md: 3, sm: 0 },
                    boxShadow: 'none',
                    },
                },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>Account Profile</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Username:
                        </Typography>
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Email:
                        </Typography>
                        <div id="language_select">
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Primary Language:
                        </Typography>
                        
                            <Button
                                ref={buttonRef}
                                id="composition-button"
                                aria-controls={'composition-menu'}
                                aria-haspopup="true"
                                aria-expanded={openDropdown ? 'true' : undefined}
                                variant="outlined"
                                color="neutral"
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
                                        variant="outlined"
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
                    </DialogContent>
                </Sheet>
            </Drawer>
        </div>
    );
}

export default AccountProfile;