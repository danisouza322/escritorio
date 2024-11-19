<?php

defined('BASEPATH') or exit('No direct script access allowed');

/*
Module Name: Certificados
Description: Módulo para cadastro de certificados com nome do cliente e data de vencimento.
Author: Seu Nome
Author URI: Seu Site
Version: 1.0.0
Requires at least: 2.3.*
*/

hooks()->add_action('admin_init', 'certificados_init_menu_items');

function certificados_init_menu_items()
{
    $CI = &get_instance();

    if (has_permission('certificados', '', 'view')) {
        $CI->app_menu->add_sidebar_menu_item('certificados', [
            'name'     => 'Certificados',
            'href'     => admin_url('certificados'),
            'position' => 10,
            'icon'     => 'fa fa-certificate',
        ]);
    }
}
