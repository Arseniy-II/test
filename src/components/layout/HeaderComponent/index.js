import React                from 'react';
import PropTypes            from 'prop-types';
import styles               from './styles.scss';
import { ROUTES }           from '_constants';
import ButtonComponent      from 'components/form/ButtonComponent';

const HeaderComponent = ( props ) => {

    return (
        <header className={ styles.header }>
            <ButtonComponent
                asLink
                to={ ROUTES.ROOT }
                className={ styles.padding }
                ariaLabel='back'
            >
                root
            </ButtonComponent>
            <ButtonComponent
                asLink
                to={ ROUTES.HISTORY }
                className={ styles.padding }
                ariaLabel='back'
            >
                History
            </ButtonComponent>
        </header>
    );
};
HeaderComponent.propTypes = {
    location: PropTypes.object.isRequired,
};

export default HeaderComponent;
