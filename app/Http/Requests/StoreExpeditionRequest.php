<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpeditionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->canEditExpeditions();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'summary' => 'required|string',
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'team_members' => 'nullable|array',
            'team_members.*' => 'string|max:255',
            'hero_image' => 'nullable|image|max:2048',
            'main_objectives' => 'nullable|string',
            'map_embed_link' => 'nullable|url',
            'status' => 'in:draft,published',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Expedition title is required.',
            'summary.required' => 'Expedition summary is required.',
            'location.required' => 'Location is required.',
            'start_date.required' => 'Start date is required.',
            'end_date.required' => 'End date is required.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
            'hero_image.image' => 'Hero image must be a valid image file.',
            'hero_image.max' => 'Hero image must not exceed 2MB.',
            'map_embed_link.url' => 'Map link must be a valid URL.',
        ];
    }
}