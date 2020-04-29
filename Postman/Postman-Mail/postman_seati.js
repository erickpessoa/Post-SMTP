jQuery(document).ready(function() {
	postmanSeatiInit();
});

function postmanSeatiInit () {

	// enable toggling of the API field from password to plain text
	enablePasswordDisplayOnEntry('seati_api_key', 'toggleSeatiApiKey');

	// define the PostmanMandrill class
	var PostmanSeati = function() {
		this.slug = "seati_api";
	}

	// behavior for handling the user's transport change
	PostmanSeati.prototype.handleTransportChange = function(transportName) {
		if (transportName == 'seati_api') {
			hide('div.transport_setting');
			hide('div.authentication_setting');
			show('div#seati_settings');
		}
	}

	// behavior for handling the wizard configuration from the
	// server (after the port test)
	PostmanSeati.prototype.handleConfigurationResponse = function(response) {
		var transportName = response.configuration.transport_type;
		if (transportName == 'seati_api') {
			show('section.wizard_seati');
		} else {
			hide('section.wizard_seati');
		}
	}

	// add this class to the global transports
	var transport = new PostmanSeati();
	transports.push(transport);

	// since we are initialize the screen, check if needs to be modded by this
	// transport
	var transportName = jQuery('select#input_transport_type').val();
	transport.handleTransportChange(transportName);

}