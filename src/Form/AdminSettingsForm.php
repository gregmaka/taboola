<?php

namespace Drupal\taboola\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class AdminSettingsForm.
 *
 * @package Drupal\taboola\Form
 */
class AdminSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'taboola.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'admin_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('taboola.settings');

    $form['global'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Global settings'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    ];
    $form['global']['service_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Service URL'),
      '#description' => $this->t('Taboola service URL'),
      '#required' => TRUE,
      '#default_value' => $config->get('service_url'),
    ];
    $form['global']['lazy_load'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Activate lazy loading'),
      '#description' => $this->t('Taboola will be loaded when it is in view.'),
      '#default_value' => $config->get('lazy_load'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('taboola.settings')
      ->set('service_url', $form_state->getValue('service_url'))
      ->set('lazy_load', $form_state->getValue('lazy_load'))
      ->save();
  }

}
