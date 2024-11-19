// Aguarda o jQuery estar carregado
function initVatVerify() {
    // Initialize tooltip
    $('#verify-vat-btn').tooltip();

    // Handle VAT verification button click
    $('#verify-vat-btn').on('click', function() {
        var cnpj = $('#vat').val();
        if (!cnpj) {
            alert_float('warning', 'Por favor, digite o CNPJ primeiro');
            return;
        }

        // Show loading state
        var $btn = $(this);
        var $icon = $btn.find('i');
        $btn.prop('disabled', true);
        $icon.removeClass('fa-check').addClass('fa-spinner fa-spin');

        // Make API call
        $.ajax({
            url: admin_url + 'clients/fetch_cnpj_data',
            type: 'POST',
            data: {
                cnpj: cnpj
            },
            success: function(response) {
                try {
                    var data = JSON.parse(response);
                    if (data.success) {
                        // Fill form fields with company data
                        $('#company').val(data.data.company);
                        $('#phonenumber').val(data.data.phonenumber);
                        $('#address').val(data.data.address);
                        $('#city').val(data.data.city);
                        $('#state').val(data.data.state);
                        $('#zip').val(data.data.zip);
                        
                        alert_float('success', 'Dados do CNPJ carregados com sucesso');
                    } else {
                        alert_float('danger', data.message);
                    }
                } catch (e) {
                    alert_float('danger', 'Erro ao processar resposta do servidor');
                }
            },
            error: function() {
                alert_float('danger', 'Erro ao consultar CNPJ');
            },
            complete: function() {
                // Reset button state
                $btn.prop('disabled', false);
                $icon.removeClass('fa-spinner fa-spin').addClass('fa-check');
            }
        });
    });
}

// Tenta inicializar a cada 100ms até o jQuery estar disponível
var checkJQuery = setInterval(function() {
    if (window.jQuery) {
        clearInterval(checkJQuery);
        initVatVerify();
    }
}, 100);
