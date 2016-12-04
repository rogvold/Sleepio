/**
 * Created by sabir on 06.09.16.
 */

var React = require('react');

var APIFunctionPanel = require('./panels/APIFunctionPanel');

var APIFactory = require('../../data/APIFactory');

var PlaygroundPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var defaultHeaders = APIFactory.DEFAULT_HEADERS;

        return (
            <div style={this.componentStyle.placeholder}>


                <APIFunctionPanel name={APIFactory.SIGN_IN.name} description={APIFactory.SIGN_IN.description}
                                  parameters={APIFactory.SIGN_IN.parameters} headers={defaultHeaders.concat(APIFactory.SIGN_IN.headers)}
                    />

                <APIFunctionPanel name={APIFactory.UPLOAD_DATA.name} description={APIFactory.UPLOAD_DATA.description}
                                  parameters={APIFactory.UPLOAD_DATA.parameters} headers={defaultHeaders.concat(APIFactory.UPLOAD_DATA.headers)}
                    />

                <APIFunctionPanel name={APIFactory.UPLOAD_REALTIME_DATA.name} description={APIFactory.UPLOAD_REALTIME_DATA.description}
                                  parameters={APIFactory.UPLOAD_REALTIME_DATA.parameters} headers={defaultHeaders.concat(APIFactory.UPLOAD_REALTIME_DATA.headers)}
                    />

            </div>
        );
    }

});

module.exports = PlaygroundPanel;