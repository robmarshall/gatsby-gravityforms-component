<?php

add_action( 'rest_api_init', 'form_submit_endpoint');

/* form submit endpoint */
function form_submit_endpoint() {
    register_rest_route('formsubmit/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'form_submit_func'
    ) );
}

function form_submit_func( WP_REST_Request $request ) {
    $data = (array) $request->get_params();
    $form = $data['formid'];
    $payload = $data['payload'];
    return GFAPI::submit_form($form, $payload);
}
