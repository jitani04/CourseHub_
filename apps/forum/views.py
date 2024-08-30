from django.shortcuts import render
from django.http import JsonResponse
from coursehub.utils import get_supabase_client


def test_supabase_connection(request):
    supabase = get_supabase_client()
    result = supabase.table('test_table').select('*').execute()

    # print("Result:", result)
    # print("Result type:", type(result))
    # print("Result dir:", dir(result))

    if hasattr(result, 'error') and result.error:
        return JsonResponse({'error': str(result.error)}, status=500)

    return JsonResponse({'data': result.data if hasattr(result, 'data') else []}, status=200)
