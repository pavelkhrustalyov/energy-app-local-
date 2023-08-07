import React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';

import './Alert.scss';

const Alert = ({ alerts }) => {
    return (
        <div className="alert__contain">
            {
                 alerts && alerts.length > 0 && alerts.map(({ id, msg, alertType }) => {
                    return <div key={id} className={classNames('alert',
                        {'success': alertType ==='success' },
                        {'error': alertType === 'error' }
                    )}>{msg}</div>
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);