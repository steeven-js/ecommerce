import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useCallback } from 'react';

import Masonry from '@mui/lab/Masonry';
import Popover from '@mui/material/Popover';

import { usePathname, useActiveLink } from 'src/routes/hooks';

import { hideScroll } from 'src/theme/css';

import NavItem from './nav-item';
import NavSubList from '../common/nav-sub-list';

export default function NavList({ data, slotProps }) {
  const navRef = useRef(null);
  const pathname = usePathname();
  const active = useActiveLink(data.path, !!data.subcategories);

  const [openMenu, setOpenMenu] = useState(false);
  const [rectTop, setRectTop] = useState(0);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const element = navRef.current;
      if (element) {
        const clientRect = element.getBoundingClientRect();
        setRectTop(clientRect.top + clientRect.height);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenMenu = useCallback(() => {
    if (data.subcategories) {
      setOpenMenu(true);
    }
  }, [data.subcategories]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const singleList = data.subcategories && data.subcategories.length === 1;

  return (
    <>
      <NavItem
        ref={navRef}
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        title={data.name}
        path={data.path || '#'}
        hasChild={!!data.subcategories}
        active={active}
        className={active ? 'active' : ''}
        sx={slotProps?.rootItem}
      />

      {!!data.subcategories && (
        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
                ...hideScroll.y,
                p: 3,
                right: 0,
                mx: 'auto',
                mt: '-2px',
                left: '0 !important',
                top: `${rectTop}px !important`,
                maxWidth: (theme) => theme.breakpoints.values.lg,
                ...(singleList && {
                  p: 2,
                  minWidth: 160,
                  left: 'auto',
                  right: 'auto',
                }),
                ...(openMenu && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          {singleList ? (
            <NavSubList data={data.subcategories} slotProps={slotProps} />
          ) : (
            <Masonry columns={4} spacing={3} defaultColumns={4} defaultSpacing={3}>
              <NavSubList data={data.subcategories} slotProps={slotProps} sx={{ mb: 2.5 }} />
            </Masonry>
          )}
        </Popover>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    subcategories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  slotProps: PropTypes.object,
};
