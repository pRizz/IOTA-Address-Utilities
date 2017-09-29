/**
 * Created by Peter Ryszkiewicz (https://github.com/pRizz) on 9/28/2017.
 * https://github.com/pRizz/IOTA-Checksum
 */

const iotaLib = window.IOTA
const iota = new iotaLib()

$(() => {
    const $iotaAddressNoChecksumInput = $('#iotaAddressNoChecksumInput')
    const $iotaAddressNoChecksumOutput = $('#iotaAddressNoChecksumOutput')
    const $iotaAddressChecksumInput = $('#iotaAddressChecksumInput')
    const $iotaAddressChecksumOutput = $('#iotaAddressChecksumOutput')
    const $iotaAddressVerifyChecksumInput = $('#iotaAddressVerifyChecksumInput')
    const $iotaAddressVerifyChecksumOutput = $('#iotaAddressVerifyChecksumOutput')


    $iotaAddressNoChecksumInput.on('input', () => {
        try {
            const addressWithChecksum = iota.utils.addChecksum($iotaAddressNoChecksumInput.val(), 9, true)
            $iotaAddressNoChecksumOutput.val(addressWithChecksum)
        } catch(e) {
            $iotaAddressNoChecksumOutput.val('Invalid input; should be 81 trytes (A-Z and 9)')
        }
    })

    $iotaAddressChecksumInput.on('input', () => {
        try {
            if($iotaAddressChecksumInput.val().length != 90) { throw 0; }
            const addressWithNoChecksum = iota.utils.noChecksum($iotaAddressChecksumInput.val()) // bug in noChecksum function; returns invalid addresses if fewer that 81 trytes
            $iotaAddressChecksumOutput.val(addressWithNoChecksum)
        } catch(e) {
            $iotaAddressChecksumOutput.val('Invalid input; should be 90 trytes (A-Z and 9)')
        }
    })

    $iotaAddressVerifyChecksumInput.on('input', () => {
        try {
            const isValid = iota.utils.isValidChecksum($iotaAddressVerifyChecksumInput.val())
            if(isValid) {
                $iotaAddressVerifyChecksumOutput.html('Good Address! <img src="iotaLogo.png" class="spinning-logo">')
            } else {
                $iotaAddressVerifyChecksumOutput.text('Bad Address or Checksum!')
            }
        } catch(e) {
            $iotaAddressVerifyChecksumOutput.text('Invalid input; should be 90 trytes (A-Z and 9)')
        }
    })

})